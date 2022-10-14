package app.ui;

import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import app.Main;
import app.model.Item;
import app.model.Order;
import app.model.UserType;
import app.service.Server;
import app.service.Authentication;
import app.service.Manager;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.TitledPane;
import javafx.scene.control.Label;
import javafx.scene.control.Accordion;
import javafx.scene.control.Button;

public class MenuController {
	public void initialize() {
	}

	// event handlers
	public void addItem() {
		Item item = new Item(UUID.randomUUID(), name, UUID.fromString(""), 0, price);
		Manager.addItemToMenu(item);

		this.initialize();
	}
	
	public void removeItem() {
		Manager.removeItemFromMenu(name);

		this.initialize();
	}



}
